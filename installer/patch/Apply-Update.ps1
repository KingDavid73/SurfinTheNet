$ErrorActionPreference = "Stop"

$installDirectory = Join-Path $env:LOCALAPPDATA "Programs\SurfinTheNet"
$resourcesDirectory = Join-Path $installDirectory "resources"
$gameExecutable = Join-Path $installDirectory "Surfin' the Net.exe"
$payloadDirectory = Join-Path $PSScriptRoot "payload"
$payloadAsar = Join-Path $payloadDirectory "app.asar"
$payloadPersonas = Join-Path $payloadDirectory "personas"
$hashFile = Join-Path $PSScriptRoot "APP_ASAR_SHA256.txt"

if (-not (Test-Path -LiteralPath $gameExecutable -PathType Leaf)) {
  throw "The existing game was not found at: $installDirectory"
}
if (-not (Test-Path -LiteralPath $payloadAsar -PathType Leaf)) {
  throw "The patch payload is incomplete: app.asar is missing."
}
if (-not (Test-Path -LiteralPath $payloadPersonas -PathType Container)) {
  throw "The patch payload is incomplete: the personas folder is missing."
}

$runningGame = Get-Process -ErrorAction SilentlyContinue | Where-Object {
  try {
    $_.Path -and $_.Path.StartsWith($installDirectory, [System.StringComparison]::OrdinalIgnoreCase)
  } catch {
    $false
  }
}
if ($runningGame) {
  throw "Surfin' the Net is still running. Close the game completely, then run this update again."
}

$expectedHash = (Get-Content -LiteralPath $hashFile -Raw).Trim().ToUpperInvariant()
$actualHash = (Get-FileHash -LiteralPath $payloadAsar -Algorithm SHA256).Hash.ToUpperInvariant()
if (-not $expectedHash -or $actualHash -ne $expectedHash) {
  throw "The patch file failed its integrity check. Copy or extract the ZIP again."
}

$installedAsar = Join-Path $resourcesDirectory "app.asar"
$installedPersonas = Join-Path $resourcesDirectory "personas"
$stagedAsar = Join-Path $resourcesDirectory "app.asar.patch-new"
$stagedPersonas = Join-Path $resourcesDirectory "personas.patch-new"
$backupAsar = Join-Path $resourcesDirectory "app.asar.patch-backup"
$backupPersonas = Join-Path $resourcesDirectory "personas.patch-backup"

if (-not (Test-Path -LiteralPath $installedAsar -PathType Leaf)) {
  throw "The installed app.asar was not found. This patch only supports the existing Windows installation."
}

foreach ($stalePath in @($stagedAsar, $stagedPersonas, $backupAsar, $backupPersonas)) {
  if (Test-Path -LiteralPath $stalePath) {
    Remove-Item -LiteralPath $stalePath -Recurse -Force
  }
}

$asarBackedUp = $false
$personasBackedUp = $false
try {
  Copy-Item -LiteralPath $payloadAsar -Destination $stagedAsar
  Copy-Item -LiteralPath $payloadPersonas -Destination $stagedPersonas -Recurse

  $stagedHash = (Get-FileHash -LiteralPath $stagedAsar -Algorithm SHA256).Hash.ToUpperInvariant()
  if ($stagedHash -ne $expectedHash) {
    throw "The staged app.asar failed verification."
  }

  Move-Item -LiteralPath $installedAsar -Destination $backupAsar
  $asarBackedUp = $true
  if (Test-Path -LiteralPath $installedPersonas) {
    Move-Item -LiteralPath $installedPersonas -Destination $backupPersonas
    $personasBackedUp = $true
  }

  Move-Item -LiteralPath $stagedAsar -Destination $installedAsar
  Move-Item -LiteralPath $stagedPersonas -Destination $installedPersonas

  Remove-Item -LiteralPath $backupAsar -Force
  if ($personasBackedUp) {
    Remove-Item -LiteralPath $backupPersonas -Recurse -Force
  }
} catch {
  if ($asarBackedUp -and (Test-Path -LiteralPath $backupAsar)) {
    if (Test-Path -LiteralPath $installedAsar) {
      Remove-Item -LiteralPath $installedAsar -Force
    }
    Move-Item -LiteralPath $backupAsar -Destination $installedAsar
  }
  if ($personasBackedUp -and (Test-Path -LiteralPath $backupPersonas)) {
    if (Test-Path -LiteralPath $installedPersonas) {
      Remove-Item -LiteralPath $installedPersonas -Recurse -Force
    }
    Move-Item -LiteralPath $backupPersonas -Destination $installedPersonas
  }
  throw
} finally {
  foreach ($stagedPath in @($stagedAsar, $stagedPersonas)) {
    if (Test-Path -LiteralPath $stagedPath) {
      Remove-Item -LiteralPath $stagedPath -Recurse -Force
    }
  }
}

Write-Host "Installed game code and persona updates."
Write-Host "Preserved the existing model folder and AppData save."
