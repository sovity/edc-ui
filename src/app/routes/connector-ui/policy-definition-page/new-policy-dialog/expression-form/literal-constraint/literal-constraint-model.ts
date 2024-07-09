export type LiteralConstraintModel = {
  expressionType: string;
  constraint: Constraint;
};

export type timeRestricted = {
  type: 'Time-Period-Restricted';
  value: {start: Date; end: Date};
};

export type connectorRestricted = {
  type: 'Connector-Restricted-Usage';
  value: string;
};

export type LiteralConstraintBase = {
  expressionType: string;
};

export type Constraint = timeRestricted | connectorRestricted;
