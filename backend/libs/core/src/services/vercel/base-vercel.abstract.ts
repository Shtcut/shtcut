import { ConfigService } from '@nestjs/config';
import { Dict } from 'shtcut/core/shared';

export abstract class BaseVercelAbstract {
  protected baseURL: string;
  protected projectId: string;
  protected teamId: string;
  protected authToken: string;
  protected projectName: string;

  constructor(config: ConfigService) {
    const { url, projectId, teamId, authToken } = config.get('app.vercel');
    this.baseURL = url;
    this.projectId = projectId;
    this.teamId = teamId;
    this.authToken = `Bearer ${authToken}`;
  }

  // Project
  public abstract createProject(name: string, options?: Dict);
  public abstract getProject(name: string, options?: Dict);
  public abstract findProject(name: string, options?: Dict);
  public abstract updateProject(name: string, options?: Dict);

  // Domain
  public abstract addDomain(name: string, options?: Dict);
  public abstract getProjectDomainByName(string, options?: Dict);
  public abstract getDomain(domain: string, options?: Dict);
  public abstract getDomainConfig(domain: string, options?: Dict);
  public abstract verifyDomain(domain: string, options?: Dict);
  public abstract removeDomain(domain: string, options?: Dict);
}
