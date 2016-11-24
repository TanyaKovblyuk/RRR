class CreateRatings < ActiveRecord::Migration[5.0]
  def change
    create_table :ratings do |t|
      t.integer :like
      t.integer :dislike
      t.integer :estimator_id,             index: true
      t.timestamps
    end

    add_reference :ratings, :user, index: true, foreign_key: true
    add_reference :ratings, :comment, index: true, foreign_key: true
    add_reference :ratings, :image, index: true, foreign_key: true
    add_reference :ratings, :post, index: true, foreign_key: true

    add_index :ratings, [:estimator_id, :user_id, :post_id], unique: true
    add_index :ratings, [:estimator_id, :user_id, :comment_id], unique: true
    add_index :ratings, [:estimator_id, :user_id, :image_id], unique: true
  end
end
