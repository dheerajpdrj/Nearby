export function postsReducer(state, action) {
  switch (action.type) {
    case 'POSTS_REQUEST':
      return ({
        ...state,
        loading: true,
      })
    case 'POSTS_SUCCESS':
      return ({
        ...state,
        loading: false,
        posts: action.payload,

      })
    case 'POSTS_ERROR':
      return ({
        ...state,
        loading: false,
        error: action.payload
      })

    default:
      return state
  }
};


export function profileReducer(state, action) {
  switch (action.type) {
    case 'PROFILE_REQUEST':
      return ({
        ...state,
        loading: true,
      })
    case 'PROFILE_SUCCESS':
      return ({
        ...state,
        loading: false,
        profile: action.payload,

      })
    case 'PROFILE_ERROR':
      return ({
        ...state,
        loading: false,
        error: action.payload
      })

    default:
      return state
  }
}

export function photosReducer (state,action){
  switch (action.type) {
    case 'PHOTOS_REQUEST':
      return({
        ...state,
        loading:true,
      })
    case 'PHOTOS_SUCCESS':
      return({
        ...state,
        loading:false,
        photos:action.payload,
  
      })
    case 'PHOTOS_ERROR':
      return({
        ...state,
        loading:false,
        error:action.payload
      })
  
    default:
      return state
  }
  }