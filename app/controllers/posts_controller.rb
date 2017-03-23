class PostsController < ApplicationController
  def index
      @post = Post.all.order("created_at desc")
      respond_to do |format|
        format.html
        format.json{ render json: @post}
      end
  end

 def show
      @post = Post.find(params[:id])
      
  end

  def new
      @post = Post.new
      @category = Category.all
  end

  def edit
      @post = Post.find(params[:id])
  end

  def create
      @post = Post.new(post_params)
      if @post.save
        redirect_to posts_path, :notice => "You post has been SAVED"
      else
        render 'new'
    end
  end

  def update
      @post = Post.find(params[:id])

      if @post.update(post_params)
        redirect_to @post
      else
        render 'edit'
      end
  end

  def destroy
      @post = Post.find(params[:id])
      @post.destroy
      redirect_to posts_path
  end

  private
  def post_params
      params.require(:post).permit(:title, :body, :category_id, :admin_user_id)
  end
end
