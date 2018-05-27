param(
    [string]$path
)
$Shell = New-Object -ComObject WScript.Shell
$link = $Shell.CreateShortcut($path)
echo $link.targetpath