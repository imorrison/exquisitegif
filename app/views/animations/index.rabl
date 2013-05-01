object @animation

attributes :title, :frames_count

if animation.gif_container
  node(:url) {|animation| animation.gif_container.animated_gif.url }
end