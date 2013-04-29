class CreateGifContainers < ActiveRecord::Migration
  def change
    create_table :gif_containers do |t|
      t.integer :animation_id, :null => false

      t.timestamps
    end
    add_index :gif_containers, :animation_id
  end
end
