json.array!(@memes) do |meme|
  json.extract! meme, :id, :name, :url
  json.url meme_url(meme, format: :json)
end
