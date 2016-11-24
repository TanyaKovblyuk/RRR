class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :text
      t.integer :user_id,             index: true
      t.integer :receiver_id,         index: true
      t.timestamps
    end
  end
end
