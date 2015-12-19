require 'test_helper'

class GamesControllerTest < ActionController::TestCase
  test "should get snake" do
    get :snake
    assert_response :success
  end

  test "should get breakout" do
    get :breakout
    assert_response :success
  end

  test "should get pong" do
    get :pong
    assert_response :success
  end

end
