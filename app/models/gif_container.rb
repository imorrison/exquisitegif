class GifContainer < ActiveRecord::Base
  attr_accessible :animation_id, :animated_gif

  belongs_to :animation
  has_one :owner, :through => :animation
  has_many :artists, :through => :animation

  has_attached_file :animated_gif

  validates :animation_id, presence: true

  after_create :building_GIF_email

  def as_json(options = {})
    {
      url: self.animated_gif.url
    }
  end

  def building_GIF_email
    self.artists.uniq.each do |artist|
      BuiltGif.delay.building_gif(artist)
    end
  end
end