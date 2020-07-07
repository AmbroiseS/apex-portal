cd %..%
call ng build --prod --baseHref="https://ambroises.github.io/apex-portal/"
copy  "..\docs\index.html" "..\docs\404.html" /Y
call git reset
call git add ../docs/
call git status
PAUSE
call git commit -m "[Deploy] --deploy by script--"
call git push origin master
