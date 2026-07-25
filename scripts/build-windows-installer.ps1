$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$compilerCandidates = @(
  (Join-Path $projectRoot "artifacts\tools\InnoSetup\ISCC.exe"),
  (Join-Path $env:LOCALAPPDATA "Programs\Inno Setup 6\ISCC.exe"),
  (Join-Path $env:ProgramFiles "Inno Setup 6\ISCC.exe")
)

if (${env:ProgramFiles(x86)}) {
  $compilerCandidates += Join-Path ${env:ProgramFiles(x86)} "Inno Setup 6\ISCC.exe"
}

$compiler = $compilerCandidates |
  Where-Object { Test-Path -LiteralPath $_ } |
  Select-Object -First 1

if (-not $compiler) {
  throw "Inno Setup 6 is required. Install JRSoftware.InnoSetup with winget, then rerun npm.cmd run make:windows."
}

Push-Location $projectRoot
try {
  & npm.cmd run package
  if ($LASTEXITCODE -ne 0) {
    throw "Electron packaging failed with exit code $LASTEXITCODE."
  }

  & $compiler (Join-Path $projectRoot "installer\windows.iss")
  if ($LASTEXITCODE -ne 0) {
    throw "Windows installer compilation failed with exit code $LASTEXITCODE."
  }
} finally {
  Pop-Location
}
