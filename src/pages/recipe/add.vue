<template>
  <q-pull-to-refresh :handler="refresher">
    <q-page class="card-examples items-start q-ma-xs">
      <div style="max-width: 800px; margin:auto">
        <q-field
          class="q-ma-sm"
          icon="local_dining"
          icon-color="primary"
          label="Recipe"
          count
          helper="Details of Recipe"
        >
          <q-input v-model="recipe.title" float-label="Title" />
          <q-input v-model="recipe.subTitle" float-label="Sub Title" />
          <q-input v-model="recipe.desc" float-label="Description" />
        </q-field>
        <q-field
          class="q-ma-sm"
          icon="access_time"
          icon-color="primary"
          :label="
            `Total Time ${recipe.preprationTime + recipe.cookTime} minunte`
          "
          helper="Details fo time"
        >
          <div class="row q-ma-sm">
            <div class="col-6">
              <q-input
                v-model="recipe.preprationTime"
                float-label="Prepration Time"
                type="number"
                suffix="Minute"
                class="q-ma-sm"
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="recipe.cookTime"
                float-label="Cook Time"
                type="number"
                suffix="Minute"
                class="q-ma-sm"
              />
            </div>
          </div>
        </q-field>
        <q-field
          class="q-ma-sm"
          icon="work"
          icon-color="primary"
          label="Ingredients"
          count
          helper="Type names"
        >
          <q-chips-input
            v-model="chips"
            placeholder="Select from list or add new one"
            stack-label="List of ingredients"
            @duplicate="duplicate"
          >
            <q-autocomplete
              :min-characters="0"
              @search="search"
              @selected="selected"
            />
          </q-chips-input>
        </q-field>

        <q-field
          class="q-ma-sm"
          icon="place"
          icon-color="primary"
          label="Steps"
          helper="write the steps"
        >
          <q-stepper
            ref="stepper"
            flat
            color="primary"
            :alternative-labels="alt"
            :contractable="contractable"
          >
            <q-step
              v-for="(step, key) in recipe.steps"
              :key="key"
              default
              :name="key"
              :title="`${key + 1}`"
            >
              <p>
                <q-input v-model="step.content" float-label="Content" />
                <q-input
                  v-model="step.time"
                  float-label="Wait for"
                  type="number"
                  suffix="Minute"
                />
                <q-uploader
                  color="primary"
                  multiple
                  stack-label="Upload Image"
                  :url="url"
                />
              </p>
            </q-step>
            <q-stepper-navigation v-if="!globalNavigation">
              <div>
                <q-btn
                  class="q-mr-sm"
                  color="secondary"
                  @click="$refs.stepper.previous()"
                >
                  Back
                </q-btn>
                <q-btn class="q-mr-sm" color="primary" @click="$_next()">
                  Next
                </q-btn>
                <q-btn
                  class="q-mr-sm"
                  color="secondary"
                  @click="$refs.stepper.next()"
                >
                  Finish
                </q-btn>
              </div>
            </q-stepper-navigation>
            <q-inner-loading :visible="progress" />
          </q-stepper>
        </q-field>
      </div>
    </q-page>
  </q-pull-to-refresh>
</template>

<script>
import { filter } from 'quasar'
export default {
  data() {
    return {
      title: 'Add recipes',
      text: '',
      text2: '',
      email: '',
      select: 'bucharest',
      group: 'pineapple',
      group2: ['paris'],
      group3: 'london',
      chips: ['Jim'],
      color: null,
      date: null,
      rating: 0,
      url: 'http://1.1.1.195/upload.php',
      step2: 'first',
      options: ['contractable', 'disable_payment', 'step_error'],
      recipe: {
        id: 1,
        user: {
          avtar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          name: 'Jiwan',
          location: 'Hydrabad'
        },
        title: 'Donuts',
        subTitle: 'Choclate Donuts',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do',
        rating: 3,
        preprationTime: 10,
        cookTime: 150,
        fullscreen: false,
        carousels: [
          {
            name: 1,
            image: 'https://cdn.quasar.dev/img/donuts.png'
          }
        ],
        ingradients: [
          {
            avatar:
              'https://static.thespicehouse.com/images/file/1313/large_square_Indian_Cumin_Seed__Whole__close.jpg',
            color: 'primary',
            label: 'Jira',
            subLabel: 'One table spoon of jira'
          },
          {
            avatar:
              'https://static.thespicehouse.com/images/file/1313/large_square_Indian_Cumin_Seed__Whole__close.jpg',
            color: 'primary',
            label: 'Salt',
            subLabel: 'One table spoon salt'
          },
          {
            avatar:
              'https://static.thespicehouse.com/images/file/1313/large_square_Indian_Cumin_Seed__Whole__close.jpg',
            color: 'primary',
            label: 'Salt',
            subLabel: 'One table spoon salt'
          },
          {
            avatar:
              'https://static.thespicehouse.com/images/file/1313/large_square_Indian_Cumin_Seed__Whole__close.jpg',
            color: 'primary',
            label: 'Salt',
            subLabel: 'One table spoon salt'
          }
        ],
        steps: [
          {
            name: 'Step0',
            time: '00',
            side: 'left',
            img:
              'https://cdn.pixabay.com/photo/2015/12/08/00/26/food-1081707_960_720.jpg',
            icon: 'exposure_zero',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do\n          eiusmod tempor incididunt ut labor'
          },
          {
            name: 'Step1',
            time: '01',
            side: 'right',
            img:
              'https://cdn.pixabay.com/photo/2015/12/08/00/26/food-1081707_960_720.jpg',
            icon: '',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do\n          eiusmod tempor incididunt ut labor'
          },
          {
            name: 'Step2',
            time: '05',
            side: 'left',
            img:
              'https://cdn.pixabay.com/photo/2015/12/08/00/26/food-1081707_960_720.jpg',
            icon: '',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do\n          eiusmod tempor incididunt ut labor'
          },
          {
            name: 'Step3',
            time: '10',
            side: 'right',
            img:
              'https://cdn.pixabay.com/photo/2017/01/31/09/30/raspberry-2023404_1280.jpg',
            icon: '',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do\n          eiusmod tempor incididunt ut labor'
          },
          {
            name: 'Step4',
            time: '15',
            side: 'left',
            img:
              'https://cdn.pixabay.com/photo/2010/12/13/10/05/background-2277_1280.jpg',
            icon: '',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do\n          eiusmod tempor incididunt ut labor'
          },
          {
            name: 'Step5',
            time: '20',
            side: 'right',
            img:
              'https://cdn.pixabay.com/photo/2016/12/26/17/28/food-1932466_1280.jpg',
            icon: 'done_all',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do\n          eiusmod tempor incididunt ut labor'
          }
        ]
      }
    }
  },
  computed: {
    contractable() {
      return this.options.includes('contractable')
    },
    globalNavigation() {
      return this.options.includes('global_navigation')
    },
    alt() {
      return this.options.includes('alt')
    },
    progress() {
      return this.options.includes('progress')
    }
  },
  methods: {
    $_next() {
      this.$refs.stepper.next()
    },
    refresher(done) {
      console.log(this.recipesItems)
      // setTimeout(() => {
      done()
      //   this.recipesItems.push({})
      //   this.$q.notify('Item #' + this.recipesItems.length + ' is new.')
      // }, 1000)
    },
    search(terms, done) {
      setTimeout(() => {
        done(
          filter(terms, {
            field: 'label',
            list: this.$store.getters['ingredients/items']
          })
        )
      }, 1000)
    },
    selected(item) {
      this.$q.notify(`Selected suggestion "${item.label}"`)
    },
    duplicate(label) {
      this.$q.notify(`"${label}" already in list`)
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'I love food'
        }
      ]
    }
  }
}
</script>

<style>
.q-stepper-horizontal > .q-stepper-header .q-stepper-tab {
  padding: 4px;
}
</style>
