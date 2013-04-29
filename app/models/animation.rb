class Animation < ActiveRecord::Base
  attr_accessible :owner_id, :title

  has_many :frames


  # def make_gif
  #  First I need a directory to work inside of (probably in temp)
  #  I need to convert all the frames to gif files
  #  then I need to run the imagemagick command
  #  after I run the imagemagik command, I should save the gif to S3
  # end

  def build_gif
    # causes in errror if run twice
    FileUtils.mkdir("#{Rails.root}/tmp/uploads/test")
    
  end
end
