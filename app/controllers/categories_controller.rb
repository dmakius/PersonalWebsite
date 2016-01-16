class CategoriesController < ApplicationController
    def index
        @@contact = Category.all
        end
    def show
        @category = Category.find(params[:id])
        @title = @category.name
        @posts = @category.posts
    end
end
