require 'uri'
require "base64"
class PostsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def add_next
    @user = User.find_by(id: params[:user_id])
    @posts = @user.posts.last(10+params[:post]).reverse
  end

  def create
    user = User.find_by(id: params[:user_id])
    user.posts.create(post_params)
    image=Image.new(post_id: Post.last.id, user_id: current_user.id)
    image.image=(params[:image]) unless params[:image].nil?
    image.save
    posts user
  end

  def destroy
    Post.find_by(id: params[:id]).destroy
    user = User.find_by(id: params[:user_id])
    posts user
  end

  def index
    respond_to do |format|
      format.json do render :json => {status: true, posts: news} end
    end
  end

  private
    def post_params
      params.permit(:text)
    end

    def image_params
      params.require(:post).permit(:image)
    end
end
