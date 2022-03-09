<template>
  <div>
    <q-layout view="lHh lpR fFf">
      <q-header elevated class="bg-cyan-8 q-electron-drag">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-space />
          <q-btn
            flat
            round
            dense
            icon="account_circle"
            class="q-mr-sm"
            @click="userProfileDialog = true"
          />
          <!-- <q-btn flat round dense icon="more_vert" /> -->
          <div v-if="isElectron()">
            <q-btn dense flat icon="minimize" @click="minimize" />
            <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
            <q-btn dense flat icon="close" @click="closeApp" />
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <q-list class="rounded-borders">
            <q-item
              clickable
              v-ripple
              active-class="bg-teal-1 text-grey-8"
              to="/new"
            >
              <q-item-section avatar>
                <q-icon name="add" />
              </q-item-section>
              <q-item-section> 新增笔记 </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              to="/blog/all"
              active-class="bg-teal-1 text-grey-8"
            >
              <q-item-section avatar>
                <q-icon name="library_books" />
              </q-item-section>
              <q-item-section> 全部笔记 </q-item-section>
            </q-item>
            <q-expansion-item>
              <template v-slot:header>
                <q-item-section avatar>
                  <q-icon name="bookmark" />
                </q-item-section>
                <q-item-section> 笔记分类 </q-item-section>
              </template>
              <q-list dense separator bordered>
                <template v-for="(label, index) in labels" :key="index">
                  <q-item
                    clickable
                    :to="'/blog/' + label.name"
                    active-class="bg-teal-1 text-grey-8"
                  >
                    <q-item-section>{{ label.name }}</q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-expansion-item>
            <q-expansion-item>
              <template v-slot:header>
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>
                <q-item-section> 设置 </q-item-section>
              </template>
              <q-list>
                <q-item
                  clickable
                  active-class="bg-teal-1 text-grey-8"
                  to="/setting/label"
                >
                  <q-item-section>标签管理</q-item-section>
                </q-item>
                <q-item
                  clickable
                  active-class="bg-teal-1 text-grey-8"
                  to="/setting/repo"
                >
                  <q-item-section>仓库管理</q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="~assets/avatar_bg.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img :src="userProfile.avatar_url" />
            </q-avatar>
            <div class="text-weight-bold">{{ userProfile.name }}</div>
            <div>{{ userProfile.email }}</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>

    <q-dialog v-model="userProfileDialog">
      <q-card class="my-card" style="min-width: 500px" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">{{ userProfile.name }}</div>
            <div class="text-caption text-grey">{{ userProfile.bio }}</div>
            <div>
              <q-btn flat round color="red" icon="room" />{{
                userProfile.location
              }}
            </div>
            <div>
              <q-btn flat round color="blue" icon="email" />{{
                userProfile.email
              }}
            </div>
            <div>
              <q-btn flat round color="blue" icon="domain" />{{
                userProfile.company
              }}
            </div>
          </q-card-section>

          <q-card-section class="col-6 flex flex-center">
            <q-img
              style="height: 140px; max-width: 150px"
              class="rounded-borders"
              :src="userProfile.avatar_url"
            />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <div>
            <q-btn flat round icon="people" />
            <q-btn flat> followers : {{ userProfile.followers }} </q-btn>
            <q-btn flat> following : {{ userProfile.following }} </q-btn>
          </div>
        </q-card-actions>
        <q-card-actions>
          <div>
            <q-btn flat round icon="folder" />
            <q-btn flat> public_repos : {{ userProfile.public_repos }} </q-btn>
            <q-btn flat>
              private_repos : {{ userProfile.total_private_repos }}
            </q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
// import { userApi } from "../api/github";

export default {
  setup() {
    // we rely upon
    function minimize() {
      if (process.env.MODE === "electron") {
        window.myWindowAPI.minimize();
      }
    }

    function toggleMaximize() {
      if (process.env.MODE === "electron") {
        window.myWindowAPI.toggleMaximize();
      }
    }

    function closeApp() {
      if (process.env.MODE === "electron") {
        window.myWindowAPI.close();
      }
    }

    function isElectron() {
      return process.env.MODE === "electron";
    }

    return {
      drawer: ref(false),
      userProfileDialog: ref(false),
      minimize,
      toggleMaximize,
      closeApp,
      isElectron,
    };
  },

  data() {
    return {};
  },

  mounted() {},
  computed: {
    labels: {
      get() {
        return this.$store.state.label.labels;
      },
    },
    userProfile: {
      get() {
        return this.$store.state.user.profile;
      },
    },
  },
};
</script>
