class AddPostIdToImages < ActiveRecord::Migration[5.0]
  def change
    add_reference :images, :post, index: true, foreign_key: true
  end
end
