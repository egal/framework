split_temp_dir_path := tmp
# Internal
#git_branch := $(shell git rev-parse --abbrev-ref HEAD)
split_int_name := $(subst /,-,$(split_dir))
split_only_branch_name := $(split_int_name)-only
split_tmp_dir_path := $(split_temp_dir_path)/split-$(split_int_name)
# Script
split:
	[[ ! " $(git_branch) " =~ " 2.x 3.x " ]] || ( echo "Error: Only 2.x or 3.x branches supports!" && exit 1 )
	[[ ! -z "$(split_dir)" ]] || ( echo "Param 'split_dir' must be provided!" && exit 1 )
	[[ ! -z "$(split_remote)" ]] || ( echo "Param 'split_remote' must be provided!" && exit 1 )
	# Create branch with
	git subtree split -P $(split_dir) -b $(split_only_branch_name)
	# Create temp folder for next steps
	rm -rf $(split_tmp_dir_path)
	mkdir -p $(split_tmp_dir_path)
	# Pull and push split result
	cd $(split_tmp_dir_path) && \
		git init  && \
		git pull --tags ../../ $(split_only_branch_name) && \
		git remote add origin $(split_remote) && \
		git checkout -b $(git_branch) && \
		git push --tags --prune origin $(git_branch)
	# Cleanup
	rm -rf $(split_tmp_dir_path)
	git branch -D $(split_only_branch_name)
# p.s. Main info from https://stackoverflow.com/questions/359424/detach-move-subdirectory-into-separate-git-repository

deploy@packages/php/framework:
	make --file=deploy.mk \
		split_remote=git@github.com:egal/framework-php-package-new.git \
		split_dir=packages/php/framework \
		git_branch=$(git_branch) \
		split
