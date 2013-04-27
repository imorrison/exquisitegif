class CreateFrames < ActiveRecord::Migration
  def change
    create_table :frames do |t|
      t.integer :user_id, :null => false
      t.integer :animation_id, :null => false
      t.text :data_url, :null => false

      t.timestamps
    end

    add_index :frames, :user_id
    add_index :frames, :animation_id
  end
end
