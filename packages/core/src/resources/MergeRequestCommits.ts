import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface MergeRequestCommitSchema extends Record<string, unknown> {
  id: string;
  short_id: string;
  created_at: string;
  title: string;
  message: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committer_name: string;
  committer_email: string;
  committed_date: string;
}

export class MergeRequestCommits<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<MergeRequestCommitSchema[], C, E, P>> {
    return RequestHelper.get<MergeRequestCommitSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/commits`,
      options,
    );
  }
}
