object @frame

attributes :data_url, :animation_id

child :animation do |frame|
  attribute :frames_count, :title
end