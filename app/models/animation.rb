class Animation < ActiveRecord::Base
  attr_accessible :owner_id, :title, :frames_count, :invitations_attributes

  has_many :frames, :dependent => :destroy
  belongs_to :owner, :class_name => 'User' 
  has_one :gif_container, :dependent => :destroy
  has_many :invitations, inverse_of: :animation

  accepts_nested_attributes_for :invitations

  validates :owner_id, :title, presence: true

  after_create :send_invitations

  def send_invitations
    self.invitations.each do |invite|
      AnimationInvite.delay.invite_email(self.owner, invite.email)
    end
  end

  def build_gif
    unless self.gif_container
      dir = "#{Rails.root}/tmp/"

      gif_name = SecureRandom.hex
      frames_name = (0...8).map{(65+rand(26)).chr}.join

      build_frames(dir, frames_name)
      run_image_magick(dir, frames_name, gif_name)
      save_associated_gif_container(dir, gif_name)
    end
  end

  private
    def build_frames(dir, frames_name)
      self.frames.each_with_index do |frame, i|
        file_index = "#{i}".rjust(3, "0")

        File.open("#{dir}#{frames_name}#{file_index}.gif", 'wb') do|f|
          f.write(Base64.decode64(frame.data_url))
        end
      end
    end

    def run_image_magick(dir, frames_name, gif_name)
      image = MiniMagick::Image.new(dir)
      image.run_command("convert -delay 20 -dispose previous -loop 0 #{dir}#{frames_name}*.gif #{dir}#{gif_name}.gif")
    end

    def save_associated_gif_container(dir, gif_name)
      c = self.build_gif_container

      File.open("#{dir}#{gif_name}.gif") do |f|
        c.animated_gif = f
      end

      c.save
    end
end
 