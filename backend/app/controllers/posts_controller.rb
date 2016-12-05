require 'uri'
require "base64"
class PostsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def get_next
    if params[:news]
      respond_to do |format|
        format.json {render :json => {status: true, posts: news(params[:num])}}
      end
    else
      get_next_posts(User.find_by(id: params[:user_id]), params[:num])
    end
  end

  def create
    current_user.posts.create(post_params)
    unless params[:image].length==0
      params[:image].each do |img|
        Image.create(post_id: Post.last.id, user_id: current_user.id, image: img)
      end
    end
    refresh_posts user
  end

  def destroy
    Post.find_by(id: params[:id]).destroy
    refresh_posts User.find_by(id: params[:user_id])
  end

  def index
    respond_to do |format|
      format.json {render :json => {status: true, posts: news(0)}}
    end
  end

  private
    def post_params
      params.permit(:text)
    end
end
