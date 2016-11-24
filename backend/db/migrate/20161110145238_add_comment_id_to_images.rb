class AddCommentIdToImages < ActiveRecord::Migration[5.0]
  def change
    add_reference :images, :comment, index: true, foreign_key: true
  end
end
