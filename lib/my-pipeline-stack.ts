import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './my-pipeline-app-stage';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('Rahul1981/test0602', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      }),
    });

    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, 'test', {
      env: { account: '196715057542', region: 'us-east-1' }
    }));

    testingStage.addPost(new ManualApprovalStep('approval'));

    const prodStage = pipeline.addStage(new MyPipelineAppStage(this, 'prod', {
      env: { account: '196715057542', region: 'us-east-1' }
    }));

    

    
  }
  }
