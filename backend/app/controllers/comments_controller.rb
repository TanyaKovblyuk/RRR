class CommentsController < ApplicationController
  def create
    Comment.create(post_params)
    user = User.find_by(id: Post.find_by(id: params[:post_id]).user_id)
    comments user
  end

  def destroy
    comment = current_user.comments.find_by(id: params[:id])
    user = User.find_by(id: Post.find_by(id: comment.post_id).user_id)
    comment.destroy
    comments user
  end

  def show
  end

  private
    def post_params
      params.permit(:post_id, :user_id, :text)
    end

    def comments user
      respond_to do |format|
        format.json do render :json => {status: true, comments: (response_comment user)} end
      end
    end
end
