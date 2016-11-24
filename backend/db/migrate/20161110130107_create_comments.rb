class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.string :text
      t.timestamps
    end

    add_reference :comments, :user, index: true, foreign_key: true
    add_reference :comments, :image, index: true, foreign_key: true
    add_reference :comments, :post, index: true, foreign_key: true
  end
end
