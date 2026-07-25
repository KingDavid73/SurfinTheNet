param(
  [string]$PatchLabel = "latest"
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$packagedDirectory = Join-Path $projectRoot "out\Surfin' the Net-win32-x64"
$packagedResources = Join-Path $packagedDirectory "resources"
$sourceAsar = Join-Path $packagedResources "app.asar"
$sourcePersonas = Join-Path $packagedResources "personas"
$templateDirectory = Join-Path $projectRoot "installer\patch"
$patchParent = Join-Path $projectRoot "out\patch"
$patchName = "SurfinTheNet-Patch-$PatchLabel"
$patchDirectory = Join-Path $patchParent $patchName
$payloadDirectory = Join-Path $patchDirectory "payload"
$zipPath = Join-Path $patchParent "$patchName.zip"

if (-not (Test-Path -LiteralPath $sourceAsar -PathType Leaf)) {
  throw "Packaged app.asar not found. Run npm.cmd run package first."
}
if (-not (Test-Path -LiteralPath $sourcePersonas -PathType Container)) {
  throw "Packaged personas not found. Run npm.cmd run package first."
}

$resolvedPatchParent = [System.IO.Path]::GetFullPath($patchParent)
$resolvedPatchDirectory = [System.IO.Path]::GetFullPath($patchDirectory)
if (-not $resolvedPatchDirectory.StartsWith($resolvedPatchParent + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Refusing to replace a patch directory outside out\patch."
}

New-Item -ItemType Directory -Path $patchParent -Force | Out-Null
if (Test-Path -LiteralPath $patchDirectory) {
  Remove-Item -LiteralPath $patchDirectory -Recurse -Force
}
if (Test-Path -LiteralPath $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

New-Item -ItemType Directory -Path $payloadDirectory -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $templateDirectory "Apply Update.cmd") -Destination $patchDirectory
Copy-Item -LiteralPath (Join-Path $templateDirectory "Apply-Update.ps1") -Destination $patchDirectory
Copy-Item -LiteralPath (Join-Path $templateDirectory "README.txt") -Destination $patchDirectory
Copy-Item -LiteralPath $sourceAsar -Destination $payloadDirectory
Copy-Item -LiteralPath $sourcePersonas -Destination $payloadDirectory -Recurse

$hash = (Get-FileHash -LiteralPath (Join-Path $payloadDirectory "app.asar") -Algorithm SHA256).Hash
Set-Content -LiteralPath (Join-Path $patchDirectory "APP_ASAR_SHA256.txt") -Value $hash -Encoding ascii

Compress-Archive -LiteralPath $patchDirectory -DestinationPath $zipPath -CompressionLevel Fastest

$zipHash = (Get-FileHash -LiteralPath $zipPath -Algorithm SHA256).Hash
Set-Content -LiteralPath "$zipPath.sha256.txt" -Value "$zipHash  $([System.IO.Path]::GetFileName($zipPath))" -Encoding ascii

Write-Host $zipPath
