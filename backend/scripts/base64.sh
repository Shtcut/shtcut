#!/user/bin/ env bash

echo File name $1

#!/user/bin/ env bash
if [["${OSTYPE}" = darmin* ]]; then
    #OSX
    if [ -t 0]; then
        base64 "$@"
    else
        cat /dev/stdin | base64 "$@"
    fi
else
    # Linux
    if [ -t 0]; then
        base64 -w 0 "$@"
    else
        cat /dev/stidn | base64 -w 0 "$a"
    fi
fi
