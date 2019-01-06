import { VictorDashboardModule } from './victor-dashboard.module';

describe('VictorDashboardModule', () => {
  let victorDashboardModule: VictorDashboardModule;

  beforeEach(() => {
    victorDashboardModule = new VictorDashboardModule();
  });

  it('should create an instance', () => {
    expect(victorDashboardModule).toBeTruthy();
  });
});
