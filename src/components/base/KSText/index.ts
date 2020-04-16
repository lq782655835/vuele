import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class KsText extends Vue {
  public static componentName = 'KsText';

  @Prop()
  public content!: any;

  @Prop({ type: Number, default: 1 })
  public row!: number;

  @Prop({ type: String, default: '-' })
  public emptyText!: string;

  @Prop({ type: [String, Number], default: 'inherit' })
  public lineHeight!: string | number;

  get formatterContent() {
    return (this.content === 0 || this.content) ? this.content : this.emptyText;
  }

  get style() {
    return {
      display: '-webkit-box',
      overflow: 'hidden',
      '-webkit-box-orient': 'vertical',
      'text-overflow': 'ellipsis',
      '-webkit-line-clamp': this.row,
      'line-height': this.lineHeight,
      'overflow-wrap': 'break-word',
    };
  }
}
