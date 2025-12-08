const App = {
  components: {
    HeaderBar,
    LoginView,
    RegisterView,
    LessonList,
    CartView
  },

  data() {
    return {
      view: 'login',
      users: [],
      loggedInUser: null,
      loginError: '',
      registerError: '',
      searchQuery: '',
      sort: { by: 'subject', order: 'asc' },
      lessons: [],
      cart: {},
      form: { name: '', phone: '' },
      orderDone: false,
    };
  },

  mounted() {
    this.fetchLessons();
  },

  methods: {
    async fetchLessons() {
      try {
        const response = await fetch("https://coursework-2-t7m3.onrender.com/lessons");
        const data = await response.json();

        this.lessons = data.map((l) => ({
          id: l._id,
          subject: l.subject,
          location: l.location,
          price: l.price,
          spaces: l.spaces,
          icon: l.icon,
          image: l.image,
          qty: 0
        }));
      } catch (err) {
        console.error("Failed to load lessons", err);
      }
    },

    toggleView() {
      this.view = this.view === 'lessons' ? 'cart' : 'lessons';
      this.orderDone = false;
    },

    toggleOrder() {
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
    },

    loginUser(credentials) {
      this.loggedInUser = {
        name: credentials.email.split("@")[0],
        email: credentials.email
      };
      this.loginError = '';
      this.view = 'lessons';
    },

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

    logout() {
      this.loggedInUser = null;
      this.cart = {};
      this.view = 'login';
    },

    addToCart(lesson) {
      if (lesson.spaces === 0) return;
      lesson.spaces--;
      lesson.qty++;

      if (!this.cart[lesson.id]) {
        this.cart[lesson.id] = { item: lesson, qty: 0 };
      }

      this.cart[lesson.id].qty++;
    },

    removeOne(lesson) {
      if (lesson.qty > 0) {
        lesson.qty--;
        lesson.spaces++;

        if (this.cart[lesson.id]) {
          this.cart[lesson.id].qty--;
          if (this.cart[lesson.id].qty <= 0) {
            delete this.cart[lesson.id];
          }
        }
      }
    },

    removeFromCart(lesson) {
      if (!this.cart[lesson.id]) return;

      const qty = this.cart[lesson.id].qty;
      lesson.spaces += qty;
      lesson.qty = 0;

      delete this.cart[lesson.id];
    },

    async checkout() {
      if (!this.canCheckout) return;

      try {
        const order = {
          name: this.form.name,
          phone: this.form.phone,
          lessons: this.cartItems.map(ci => String(ci.item.id))
        };

        await fetch("https://coursework-2-t7m3.onrender.com/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order)
        });

        for (const ci of this.cartItems) {
          await fetch(`https://coursework-2-t7m3.onrender.com/lessons/${ci.item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ space: ci.item.spaces })
          });
        }

        this.orderDone = true;
        this.cart = {};
        this.form = { name: '', phone: '' };

        this.fetchLessons();

      } catch (err) {
        console.error("Checkout failed", err);
      }
    },
  },

  computed: {
    filteredLessons() {
      const q = this.searchQuery.toLowerCase().trim();
      if (!q) return this.lessons;
      return this.lessons.filter((l) =>
        Object.values(l).some((v) => String(v).toLowerCase().includes(q))
      );
    },

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

    cartItems() {
      return Object.values(this.cart);
    },

    cartCount() {
      return this.cartItems.reduce((s, c) => s + c.qty, 0);
    },

    cartTotal() {
      return this.cartItems.reduce((s, c) => s + c.qty * c.item.price, 0);
    },

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
