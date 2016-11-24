class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.string :text
      t.timestamps
    end

    add_reference :posts, :user, index: true, foreign_key: true
  end
end
