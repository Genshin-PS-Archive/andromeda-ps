export interface WorldProps {
  level: number
}

export class World {
  public entityId: number = 0

  constructor(public props: WorldProps) { }

  public nextEntityId(entityType: number) {
    return (entityType << 24) + (this.entityId++)
  }

  get level() {
    return this.props.level
  }
}