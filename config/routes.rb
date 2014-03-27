Personal::Application.routes.draw do
  root  'static_pages#home'
  match 'test', to: 'static_pages#test', via: [:get]
  match 'juicedup', to: 'static_pages#juicedup', via: [:get]
  match 'galactic', to: 'static_pages#galactic', via: [:get]
  match 'exp', to: 'static_pages#exp', via: [:get]
  match 'twitnow', to: 'static_pages#hose', via: [:get]
  match 'fetchmore', to: 'static_pages#fetch', via: [:get]
  # game related
  match 'save', to: 'game#save', via: [:post]
  match 'load', to: 'game#load', via: [:get]
  match 'rb', to: 'game#rebirth', via: [:post]
  match 'grab', to: 'game#getRbCredits', via: [:get]

  get "/404", :to => "errors#not_found"
  get "/422", :to => "errors#unacceptable"
  get "/500", :to => "errors#internal_error"


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end
  
  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
