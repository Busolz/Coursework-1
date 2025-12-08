const CartView = {
  props: ['cartItems', 'cartCount', 'cartTotal', 'form', 'validName', 'validPhone', 'canCheckout', 'orderDone'],
  emits: ['removeItem', 'checkout', 'back', 'update:form'],
  template: `
    <div class="card p-3">
      <div class="d-flex justify-content-between mb-3">
        <h4>Shopping Cart</h4>
        <button class="btn btn-outline-secondary btn-sm" @click="$emit('back')">Back</button>
      </div>

      <div v-if="cartItems.length">
        <div class="list-group mb-3">
          <div class="list-group-item" v-for="ci in cartItems" :key="ci.item.id">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="mb-0">{{ci.item.subject}}</h6>
                <small class="text-muted">{{ci.item.location}}</small>
              </div>
              <div class="text-end">
                <div>£{{ci.item.price.toFixed(2)}}</div>
                <small>Qty: {{ci.qty}}</small>
              </div>
            </div>
            <button class="btn btn-sm btn-danger mt-2" @click="$emit('removeItem', ci.item)">
              <i class="fa-solid fa-trash-can me-1"></i>Remove
            </button>
          </div>
        </div>

        <div class="mb-4">
          <p class="mb-1">Items: <strong>{{cartCount}}</strong></p>
          <p class="mb-1">Total: <strong>£{{cartTotal.toFixed(2)}}</strong></p>
        </div>

        <div class="card p-3 mb-3">
          <h6>Checkout</h6>
          <form @submit.prevent="$emit('checkout')">
            <div class="row g-2">
              <div class="col-md-6">
                <label class="form-label">Name</label>
                <input :value="form.name"
                       @input="$emit('update:form', {...form, name: $event.target.value})"
                       class="form-control"
                       placeholder="Letters only">
              </div>
              <div class="col-md-6">
                <label class="form-label">Phone</label>
                <input :value="form.phone"
                       @input="$emit('update:form', {...form, phone: $event.target.value})"
                       class="form-control"
                       placeholder="Numbers only">
              </div>
              <div class="col-12 text-end mt-3">
                <button type="submit" class="btn btn-success" :disabled="!canCheckout">Checkout</button>
              </div>
            </div>
          </form>
        </div>

        <div v-if="orderDone" class="alert alert-success">
          <i class="fa-solid fa-check-circle me-1"></i>
          Order submitted!
        </div>
      </div>

      <div v-else>
        <div class="alert alert-info">Cart is empty.</div>
      </div>
    </div>
  `
};
