class AddAnimatedGigToGifConainer < ActiveRecord::Migration
  def self.up
    add_attachment :gif_containers, :animated_gif
  end

  def self.down
    remove_attachment :gif_containers, :animated_gif
  end
end
