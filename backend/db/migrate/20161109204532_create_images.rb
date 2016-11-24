class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.string   "image"
      t.datetime "created_at"
      t.boolean  "avatar",         default: false
    end

    add_reference :images, :user, index: true, foreign_key: true
  end
end
