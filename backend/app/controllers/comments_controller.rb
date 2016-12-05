class CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    Comment.create(post_params)
    user = User.find_by(id: Post.find_by(id: params[:post_id]).user_id)
    respond_comments user
  end

  def destroy
    comment = Comment.find_by(id: params[:id])
    user = User.find_by(id: Post.find_by(id: comment.post_id).user_id)
    comment.destroy
    respond_comments user
  end

  private
    def post_params
      params.permit(:post_id, :user_id, :text)
    end

    def respond_comments user
      respond_to do |format|
        format.json {render :json => {status: true, comments: response_comment(user)}}
      end
    end
end
