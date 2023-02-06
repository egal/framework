git/checkout-4.x:
	git checkout 4.x
	git pull

git/new-4.x-patch-branch: git/checkout-4.x
	git checkout -b 4.x-patch-$(shell date +%H.%M.%S-%d.%m.%Y)
