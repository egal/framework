git/clean-local-branches: git/checkout-3.x
	git branch --delete `git branch -a | grep -v '3.x' | grep -v \* | xargs`

git/checkout-3.x:
	git checkout 3.x
	git pull

git/new-3.x-patch-branch: git/checkout-3.x
	git checkout -b 3.x-patch-$(shell date +%H:%M:%S-%d.%m.%Y)
