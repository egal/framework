<template>
  <div class="profile-container">
    <div class="user-info-container">
      <h5>{{ userInfoHeader }}</h5>
      <div class="user-avatar">
        <e-avatar :data="avatarData" class="avatar"></e-avatar>
        <div class="edit-btn">
          <e-button :data="buttonData">
            <BootstrapIcon
              class="button-icon"
              icon="pencil-square"
            ></BootstrapIcon>
          </e-button>
        </div>
      </div>
      <div class="user-info">
        <div v-for="(widget, index) in userInfoWidgetSet" :key="index">
          <e-widget
            class="info-input"
            :type="widget.type"
            :data="widget.data"
            :style-config="$data[widget.type + 'StyleConfig']"
          ></e-widget>
        </div>
      </div>
      <div class="user-job-info">
        <h5>{{ userJobInfoHeader }}</h5>
        <div v-for="(widget, index) in selectWidgetSet" :key="index">
          <e-widget
            class="info-input"
            :type="widget.type"
            :data="widget.data"
            :style-config="$data[widget.type + 'StyleConfig']"
          ></e-widget>
        </div>
      </div>
    </div>
    <div class="user-stats">
      <div class="pie-chart">Pie chart</div>
      <div class="line-chart">Line chart</div>
      <div class="bar-chart">Bar chart</div>
    </div>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import { buttonStyleConfig } from '@/assets/styleTemplates/EButton'
import { counterStyleConfig } from '@/assets/styleTemplates/ECounter'
import { inputStyleConfig } from '@/assets/styleTemplates/EInput'

export default {
  name: 'UserProfile',
  components: { BootstrapIcon },
  data() {
    return {
      avatarData: {
        size: 'xxl',
        imgUrl: require('../assets/avatar.svg'),
      },
      counterStyleConfig: counterStyleConfig,
      inputStyleConfig: inputStyleConfig,
      userInfoHeader: 'Основная информация',
      userJobInfoHeader: 'Информация по проекту',
      buttonStyleConfig: buttonStyleConfig,
      buttonData: {
        size: 'lg',
        softColors: true,
      },
      userInfo: {
        name: 'Name',
        surname: 'Surname',
        phone: '+7(888)888 88 88',
      },
      userInfoWidgetSet: [
        {
          type: 'input',
          data: {
            name: 'Input',
            placeholder: 'Name',
            label: 'Name',
            type: 'text',
            required: true,
            clearable: true,
          },
        },
        {
          type: 'input',
          data: {
            name: 'Input',
            placeholder: 'Surname',
            label: 'Surname',
            type: 'text',
            required: true,
            clearable: true,
          },
        },
        {
          type: 'input',
          data: {
            name: 'Input',
            placeholder: 'Phone',
            label: 'Phone',
            type: 'tel',
            required: true,
            clearable: true,
          },
        },
      ],
      selectWidgetSet: [
        {
          type: 'select',
          data: {
            label: 'Role',
            required: true,
            options: [
              {
                name: 'Option one',
                key: 1,
              },
              {
                name: 'Option two',
                key: 2,
              },
              {
                name: 'Option three',
                key: 3,
              },
            ],
          },
        },
        {
          type: 'select',
          data: {
            label: 'Department',
            required: true,
            options: [
              {
                name: 'Option one',
                key: 1,
              },
              {
                name: 'Option two',
                key: 2,
              },
              {
                name: 'Option three',
                key: 3,
              },
            ],
          },
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';

.profile-container {
  height: auto;
  margin: 26px 48px 0 24px;
  display: flex;

  .user-info-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    width: 316px;
    min-height: 661px;
    height: auto;
    box-shadow: $shadow-sm;
    border-radius: $all-sides-2xl;
    background: $base-white;

    h5 {
      margin-bottom: 24px;
    }

    .user-avatar {
      display: flex;
      align-items: flex-end;
      margin-bottom: 34px;
      position: relative;

      .edit-btn {
        width: 64px;
        height: 46px;
        position: absolute;
        left: 70px;
        top: 80px;
        z-index: 2;
      }

      .button-icon {
        width: 15px;
        height: 15px;
        fill: $default-accent;
      }
    }

    .user-info {
      min-height: 250px;

      .info-input {
        margin-bottom: 16px;
      }
    }

    .user-job-info {
      padding-top: 24px;
      border-top: 1px solid $gray-300;
      width: 100%;

      .job-input {
        margin-bottom: 16px;
      }
    }
  }

  .user-stats {
    display: grid;
    width: 100%;
    margin-left: 24px;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 306px;
    grid-gap: 24px;

    .pie-chart,
    .line-chart,
    .bar-chart {
      box-shadow: $shadow-sm;
      border-radius: $all-sides-2xl;
      background: $base-white;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .bar-chart {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 2;
    }
  }
}
</style>
