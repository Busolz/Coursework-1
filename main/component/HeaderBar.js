const HeaderBar = {
  props: ['cartCount'],
  template: `
    <header class="d-flex align-items-center mb-4">
      <div class="me-auto">
        <h1 class="h4 mb-0">After-School Lessons Marketplace</h1>
        <small class="text-muted">Browse & buy lessons</small>
      </div>
      <div class="ms-3 d-flex align-items-center">
        <button class="btn btn-outline-primary me-2 position-relative"
                :disabled="cartCount === 0"
                @click="$emit('toggleView')">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="ms-1">Cart</span>
          <span v-if="cartCount > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ cartCount }}
          </span>
        </button>
        <button class="btn btn-outline-danger btn-sm" @click="$emit('logout')">
          <i class="fa-solid fa-right-from-bracket me-1"></i>Logout
        </button>
      </div>
    </header>
  `
};