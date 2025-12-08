const App = {
  // Register components used inside this component (these must be defined globally before app.js)
  components: { 
    HeaderBar, 
    LoginView, 
    RegisterView, 
    LessonList, 
    CartView 
  },

  // Reactive state for the root component
  data() {
    return {
      view: 'login',            // which view to show: 'login', 'register', 'lessons' or 'cart'
      users: [],                // locally stored registered users (demo purposes only)
      loggedInUser: null,       // currently logged-in user object
      loginError: '',           // holds login error messages (unused in Option A but kept)
      registerError: '',        // holds registration errors
      searchQuery: '',          // search text for lessons
      sort: { by: 'subject', order: 'asc' }, // sort options used by LessonList
      lessons: [],              // lessons fetched from backend
      cart: {},                 // cart object with lessonId keys -> { item, qty }
      form: { name: '', phone: '' }, // checkout form data
      orderDone: false,         // indicates a successful checkout
    };
  },

  // Lifecycle hook — called after component is mounted to the DOM
  mounted() {
    this.fetchLessons(); // fetch data from backend as soon as the app loads
  },

  methods: {
    // Fetch all lessons from backend and map to frontend shape
    async fetchLessons() {
      try {
        // NOTE: this must point to your deployed backend (Render). Using `localhost` will fail on GitHub Pages.
        const response = await fetch("https://coursework-2-t7m3.onrender.com/lessons");
        const data = await response.json();

        // Map backend lesson objects -> frontend lesson objects
        // IMPORTANT: backend field name should match this (here we expect `spaces` and `image` fields)
        this.lessons = data.map((l) => ({
          id: l._id,           // MongoDB document id
          subject: l.subject,
          location: l.location,
          price: l.price,
          spaces: l.spaces,    // make sure backend documents use `spaces` (plural)
          icon: l.icon,        // optional Font Awesome class string
          image: l.image,      // optional image URL or path (see notes below)
          qty: 0               // quantity selected in the UI (local-only)
        }));
      } catch (err) {
        // If fetch fails (backend down / CORS / wrong URL), log it for debugging
        console.error("Failed to load lessons", err);
      }
    },

    // Toggle between lesson list and cart view
    toggleView() {
      this.view = this.view === 'lessons' ? 'cart' : 'lessons';
      this.orderDone = false; // clear order confirmation when switching
    },

    // Toggle sort order between ascending/descending
    toggleOrder() {
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
    },

    // Option A: login always succeeds — no server authentication (demo mode)
    loginUser(credentials) {
      this.loggedInUser = {
        name: credentials.email.split("@")[0], // derive a display name from email
        email: credentials.email
      };
      this.loginError = '';
      this.view = 'lessons';
    },

    // Simple register (client side only for demo); prevents duplicate emails locally
    registerUser(user) {
      if (this.users.find((u) => u.email === user.email)) {
        this.registerError = 'Email already registered';
        return;
      }
      this.users.push(user);
      this.registerError = '';
      alert('Registration successful! Please log in.');
      this.view = 'login';
    },

    // Logout logic resets user and cart
    logout() {
      this.loggedInUser = null;
      this.cart = {};
      this.view = 'login';
    },

    // Add one unit of lesson to cart, reduce available spaces locally
    addToCart(lesson) {
      if (lesson.spaces === 0) return; // prevent adding if no space left

      lesson.spaces--;  // reduce availability shown in UI
      lesson.qty++;     // increase selected qty for this lesson

      if (!this.cart[lesson.id]) {
        // initialize cart entry if not present
        this.cart[lesson.id] = { item: lesson, qty: 0 };
      }

      this.cart[lesson.id].qty++;
    },

    // Remove one unit of lesson from cart (increment availability)
    removeOne(lesson) {
      if (lesson.qty > 0) {
        lesson.qty--;
        lesson.spaces++;

        if (this.cart[lesson.id]) {
          this.cart[lesson.id].qty--;
          if (this.cart[lesson.id].qty <= 0) {
            delete this.cart[lesson.id]; // remove entry if qty becomes 0
          }
        }
      }
    },

    // Remove entire lesson from cart and restore spaces
    removeFromCart(lesson) {
      if (!this.cart[lesson.id]) return;

      const qty = this.cart[lesson.id].qty;
      lesson.spaces += qty; // restore available spaces
      lesson.qty = 0;

      delete this.cart[lesson.id];
    },

    // Checkout: post order and update lessons on the backend
    async checkout() {
      if (!this.canCheckout) return;

      try {
        const order = {
          name: this.form.name,
          phone: this.form.phone,
          lessons: this.cartItems.map(ci => String(ci.item.id))
        };

        // Create order on backend
        await fetch("https://coursework-2-t7m3.onrender.com/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order)
        });

        // IMPORTANT FIX: backend documents use `spaces` — update that field (plural)
        // YOUR CURRENT CODE had `body: JSON.stringify({ space: ci.item.spaces })`
        // Change it to `spaces` so the DB field stays consistent:
        for (const ci of this.cartItems) {
          await fetch(`https://coursework-2-t7m3.onrender.com/lessons/${ci.item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            // Ensure you update the correct field name (backend expects `spaces`)
            body: JSON.stringify({ spaces: ci.item.spaces })
          });
        }

        // Reset UI state after successful checkout
        this.orderDone = true;
        this.cart = {};
        this.form = { name: '', phone: '' };

        // Refresh lessons from backend (to pick up new spaces state)
        this.fetchLessons();

      } catch (err) {
        console.error("Checkout failed", err);
      }
    },
  },

  computed: {
    // Filter lessons by search query (search-as-you-type)
    filteredLessons() {
      const q = this.searchQuery.toLowerCase().trim();
      if (!q) return this.lessons;
      return this.lessons.filter((l) => 
        Object.values(l).some((v) => String(v).toLowerCase().includes(q))
      );
    },

    // Sort the filtered lessons according to sort.by and sort.order
    sortedLessons() {
      const arr = [...this.filteredLessons];
      const key = this.sort.by;
      const order = this.sort.order === 'asc' ? 1 : -1;

      arr.sort((a, b) => {
        let av = a[key], bv = b[key];
        if (typeof av === 'string') av = av.toLowerCase();
        if (typeof bv === 'string') bv = bv.toLowerCase();
        return av > bv ? order : av < bv ? -order : 0;
      });

      return arr;
    },

    // Cart helpers derived from `cart` object
    cartItems() {
      return Object.values(this.cart);
    },

    cartCount() {
      return this.cartItems.reduce((s, c) => s + c.qty, 0);
    },

    cartTotal() {
      return this.cartItems.reduce((s, c) => s + c.qty * c.item.price, 0);
    },

    // Validation helpers for checkout form
    validName() {
      return /^[A-Za-z\s]+$/.test(this.form.name.trim());
    },

    validPhone() {
      return /^[0-9]+$/.test(this.form.phone.trim());
    },

    canCheckout() {
      return this.cartCount > 0 && this.validName && this.validPhone;
    },
  },

  // Root template uses the subcomponents and binds props/events
  template: `
    <div class="container py-4">

      <HeaderBar v-if="view !== 'login' && view !== 'register'"
                 :cartCount="cartCount"
                 @toggleView="toggleView"
                 @logout="logout" />

      <LoginView v-if="view === 'login'"
                 @login="loginUser"
                 @switchRegister="view = 'register'"
                 :error="loginError" />

      <RegisterView v-else-if="view === 'register'"
                    @register="registerUser"
                    @switchLogin="view = 'login'"
                    :error="registerError" />

      <LessonList v-else-if="view === 'lessons'"
                  :lessons="sortedLessons"
                  :searchQuery="searchQuery"
                  :sort="sort"
                  @addToCart="addToCart"
                  @removeOne="removeOne"
                  @toggleOrder="toggleOrder"
                  v-model:searchQuery="searchQuery"
                  v-model:sort="sort" />

      <CartView v-else
                :cartItems="cartItems"
                :cartCount="cartCount"
                :cartTotal="cartTotal"
                :form="form"
                :validName="validName"
                :validPhone="validPhone"
                :canCheckout="canCheckout"
                :orderDone="orderDone"
                @checkout="checkout"
                @removeItem="removeFromCart"
                @back="toggleView"
                v-model:form="form" />

    </div>
  `
};
