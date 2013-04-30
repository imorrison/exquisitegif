class GifContainer < ActiveRecord::Base
  attr_accessible :animation_id, :animated_gif

  belongs_to :animation

  has_attached_file :animated_gif

  validates :animation_id, presence: true

  def as_json(options = {})
    # this also needs some work
    {
      url: self.animated_gif.url
    }
  end
end
