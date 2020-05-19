if ($args.count -eq 0) 
{
		Write-Host "      command 'param1' 'param2'";exit 0
}

$param1 = $args[0];if ([string]::IsNullOrEmpty($param1)) { throw "No param1 specified."}
$param2 = $args[1];if ([string]::IsNullOrEmpty($param2)) { throw "No param2 specified."}

cls

Write-Host "---------------------------------------"; 
Write-Host "command '$param1' acting with '$param2'."; Write-Host "."

#********************************************************
# git commands
#
git do_something $param1

git do_something $param2

git do_something_else
#********************************************************
	
Write-Host "---------------------------------------"

if (-NOT ([string]::IsNullOrEmpty($waitForKey))) {Write-Host "Press any key to continue..."; 
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")}
#********************************************************