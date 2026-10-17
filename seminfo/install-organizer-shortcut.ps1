[CmdletBinding(SupportsShouldProcess=$true)]
param()
$ErrorActionPreference='Stop'
$launcher=Join-Path $PSScriptRoot 'Abrir Central SEMINFO.vbs'
$shell=New-Object -ComObject WScript.Shell
foreach($folder in @([Environment]::GetFolderPath('Desktop'),[Environment]::GetFolderPath('Programs'))) {
    $target=Join-Path $folder 'Central SEMINFO.lnk'
    if($PSCmdlet.ShouldProcess($target,'Criar atalho da central dos organizadores')) {
        $shortcut=$shell.CreateShortcut($target)
        $shortcut.TargetPath=Join-Path $env:SystemRoot 'System32/wscript.exe'
        $shortcut.Arguments='"'+$launcher+'"'
        $shortcut.WorkingDirectory=$PSScriptRoot
        $shortcut.Description='Organizar a maratona, aprovar equipes, projetar placares e fazer backup'
        $shortcut.Save()
    }
}
