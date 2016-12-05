require 'uri'
require "base64"
class PostsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def get_next
    if params[:news]
      respond_to do |format|
        format.json do render :json => {status: true, posts: (news params[:num])} end
      end
    else
      user = User.find_by(id: params[:user_id])
      get_next_posts(user, params[:num])
    end
  end

  def create
    user = User.find_by(id: params[:user_id])
    user.posts.create(post_params)
    unless params[:image].length==0
      params[:image].each do |img|
        Image.create(post_id: Post.last.id, user_id: current_user.id, image: img)
      end
    end
    posts user
  end

  def destroy
    Post.find_by(id: params[:id]).destroy
    user = User.find_by(id: params[:user_id])
    posts user
  end

  def index
    respond_to do |format|
      format.json do render :json => {status: true, posts: (news 0)} end
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
