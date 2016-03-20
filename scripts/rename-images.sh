#!/bin/bash
FILES_LIST="$(ls $1)"
re_image="(.*)(\.jpg$|\.JPG$|\.jpeg$|\.JPEG$|\.png$|\.PNG$)"
re_dims="\([0-9]*x[0-9]*\)"
for file in $1/*
do
  #something with $file
  if [[ $file =~ $re_image ]]; then
    base=${BASH_REMATCH[1]};
    ext=${BASH_REMATCH[2]};
    if ! [[ $file =~ $re_dims ]]; then
      width="$(sips -g pixelWidth "$file" | tail -n1 | cut -d" " -f4)"
      height="$(sips -g pixelHeight "$file" | tail -n1 | cut -d" " -f4)"
      echo "$base($width"x"$height)$ext"
      mv "$file" "$base($width"x"$height)$ext"
    fi
  fi
done
