#!/bin/bash

git fetch origin && \
git fetch origin -t && \
git checkout -b release-branch origin/master && \

echo "Fetched origin, created release-branch."

CURTAG=`git describe --abbrev=0 --tags`;
CURTAG=$(sed 's/[^0-9.]//g' <<< $CURTAG) # strip all but numbers and dots to extract specific version

IFS='.' read -a vers <<< "$CURTAG"

MAJ=${vers[0]}
MIN=${vers[1]}

BUG=$([ "${vers[2]}" == "" ] && echo 0 || echo "$d")

echo "Current Tag: v$MAJ.$MIN.$BUG"

for cmd in "$@"
do
	case $cmd in
		"--major")
			# $((MAJ+1))
			((MAJ+=1))
			MIN=0
			BUG=0
			echo "Incrementing Major Version#"
			;;
		"--minor")
			((MIN+=1))
			BUG=0
			echo "Incrementing Minor Version#"
			;;
		"--bug")
			((BUG+=1))
			echo "Incrementing Bug Version#"
			;;
	esac
done

NEWTAG="release-v$MAJ.$MIN.$BUG"
BRANCH="production-${NEWTAG}"

echo "Adding Tag: $NEWTAG";

git branch -m "$BRANCH" && \
npm --no-git-tag-version --allow-same-version version "$MAJ.$MIN.$BUG" && \
git add package.json package-lock.json && \
git commit -m "Bump! $NEWTAG" && \
git tag -a "$NEWTAG" -m  "Production ${NEWTAG}" && \
git push -u --follow-tags origin head:master && \

echo "Don't forget to Pull Request the release!"
