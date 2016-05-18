class NewsfeedController < ApplicationController
  def index
    @results = Google::Search::News.new(query: "Top News").first(5)
  end
  def show
  end
end
